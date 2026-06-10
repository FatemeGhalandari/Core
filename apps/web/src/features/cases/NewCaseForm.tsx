import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

type NewCaseFormProps = {
  onCancel: () => void;
};

type CreateCasePayload = {
  title: string;
  description?: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  priority: "low" | "normal" | "high" | "urgent";
};

async function createCase(payload: CreateCasePayload) {
  const response = await api.post("/api/cases", payload);
  return response.data;
}

export function NewCaseForm({ onCancel }: NewCaseFormProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [priority, setPriority] =
    useState<CreateCasePayload["priority"]>("normal");

  const mutation = useMutation({
    mutationFn: createCase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      onCancel();
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    mutation.mutate({
      title,
      description: description || undefined,
      customerName,
      customerEmail: customerEmail || undefined,
      customerPhone: customerPhone || undefined,
      priority,
    });
  }

  return (
    <form className="new-case-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <h2>Create New Case</h2>
          <p>Add a customer request to the case inbox.</p>
        </div>

        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <label>
        Case title
        <input
          required
          minLength={3}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Patient needs follow-up appointment"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add details about the customer request..."
        />
      </label>

      <div className="form-grid">
        <label>
          Customer name
          <input
            required
            minLength={2}
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Emily Carter"
          />
        </label>

        <label>
          Priority
          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as CreateCasePayload["priority"])
            }
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
      </div>

      <div className="form-grid">
        <label>
          Customer email
          <input
            type="email"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            placeholder="emily@example.com"
          />
        </label>

        <label>
          Customer phone
          <input
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            placeholder="555-0199"
          />
        </label>
      </div>

      {mutation.isError && (
        <div className="form-error">
          Failed to create case. Check that your backend is running.
        </div>
      )}

      <button
        className="primary-button"
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating..." : "Create Case"}
      </button>
    </form>
  );
}
