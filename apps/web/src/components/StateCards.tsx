function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

export function LoadingState({ message }: { message: string }) {
  return (
    <div className="state-card state-card-centered">
      <span className="state-kicker">Loading</span>
      <h2>{message}</h2>
      <p>Getting the latest workspace data.</p>
    </div>
  );
}

export function ErrorState({
  title,
  message,
  error,
  action,
}: {
  title: string;
  message: string;
  error?: unknown;
  action?: React.ReactNode;
}) {
  return (
    <div className="state-card error state-card-centered">
      <span className="state-kicker">Needs attention</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {error ? <pre>{getErrorMessage(error)}</pre> : null}
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="state-card empty-state state-card-centered">
      <span className="state-kicker">Nothing here yet</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action ? <div className="empty-actions">{action}</div> : null}
    </div>
  );
}
