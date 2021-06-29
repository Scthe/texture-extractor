import {
  captureEvent,
  captureException,
  eventFromException,
  Scope,
  withScope,
} from "@sentry/browser";
import type { Event } from "@sentry/types";
import { h } from "preact";
import {
  Component,
  ComponentChildren,
  ComponentType,
  isValidElement,
  VNode,
} from "preact";

//////////////
//////////////
// Custom error boundary to work with Preact
//////////////
//////////////

const UNKNOWN_COMPONENT = "unknown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PreactNode = VNode<any>;

export interface FallbackProps {
  error: Error;
  componentStack: string | null;
  eventId: string | null;
  resetError(): void;
}
type FallbackRender = (errorData: FallbackProps) => PreactNode;

type ErrorBoundaryProps = {
  fallback?: PreactNode | FallbackRender;
  beforeCapture?(
    scope: Scope,
    error: Error | null,
    componentStack: string | null,
  ): void;
};

type ErrorBoundaryState = {
  componentStack: string | null;
  error: Error | null;
  eventId: string | null;
};

const INITIAL_STATE = {
  componentStack: null,
  error: null,
  eventId: null,
};

function captureReactErrorBoundaryError(
  error: Error,
  componentStack: string,
): string {
  const errorBoundaryError = new Error(error.message);
  errorBoundaryError.name = `React ErrorBoundary ${errorBoundaryError.name}`;
  errorBoundaryError.stack = componentStack;

  let errorBoundaryEvent: Event = {};
  void eventFromException({}, errorBoundaryError).then((e) => {
    errorBoundaryEvent = e;
  });

  if (
    errorBoundaryEvent.exception &&
    Array.isArray(errorBoundaryEvent.exception.values)
  ) {
    let originalEvent: Event = {};
    void eventFromException({}, error).then((e) => {
      originalEvent = e;
    });
    if (
      originalEvent.exception &&
      Array.isArray(originalEvent.exception.values)
    ) {
      originalEvent.exception.values = [
        ...errorBoundaryEvent.exception.values,
        ...originalEvent.exception.values,
      ];
    }

    return captureEvent(originalEvent);
  }

  return captureException(error, { contexts: { react: { componentStack } } });
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = INITIAL_STATE;

  public componentDidCatch(
    error: Error,
    // { componentStack }: React.ErrorInfo // <- this descturct. causes error
  ): void {
    const { beforeCapture } = this.props;
    const componentStack = ""; // hack

    withScope((scope) => {
      if (beforeCapture) {
        beforeCapture(scope, error, componentStack);
      }
      const eventId = captureReactErrorBoundaryError(error, componentStack);
      this.setState({ error, componentStack, eventId });
    });
  }

  public resetErrorBoundary: () => void = () => {
    this.setState(INITIAL_STATE);
  };

  public render(): ComponentChildren {
    const { fallback } = this.props;
    const { error, componentStack, eventId } = this.state;

    if (error) {
      if (isValidElement(fallback)) {
        return fallback;
      }
      if (typeof fallback === "function") {
        return fallback({
          error,
          componentStack,
          resetError: this.resetErrorBoundary,
          eventId,
        });
      }

      // Fail gracefully if no fallback provided
      return null;
    }

    return this.props.children;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withErrorBoundary<P extends Record<string, any>>(
  WrappedComponent: ComponentType<P>,
  errorBoundaryOptions: ErrorBoundaryProps,
): React.FC<P> {
  const componentDisplayName =
    WrappedComponent.displayName || WrappedComponent.name || UNKNOWN_COMPONENT;

  const Wrapped: React.FC<P> = (props: P) => (
    <ErrorBoundary {...errorBoundaryOptions}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  Wrapped.displayName = `errorBoundary(${componentDisplayName})`;

  // Copy over static methods from Wrapped component to Profiler HOC
  // See: https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  // hoistNonReactStatics(Wrapped, WrappedComponent);
  return Wrapped;
}

// eslint-disable-next-line import/no-unused-modules
export { ErrorBoundary, withErrorBoundary };
