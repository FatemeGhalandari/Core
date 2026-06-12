import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
  intakeData?: Record<string, unknown>;
};

type IntakeFieldType =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "select"
  | "multiselect"
  | "checkbox";

type IntakeFieldSetting = {
  id: string;
  key: string;
  label: string;
  fieldType: IntakeFieldType;
  placeholder: string | null;
  helpText: string | null;
  options: unknown;
  isRequired: boolean;
  showOnCaseDetail: boolean;
  isActive: boolean;
  sortOrder: number;
};

type IntakeFieldsResponse = {
  data: IntakeFieldSetting[];
};

type CreateCaseErrorResponse = {
  message?: string;
  missingFields?: string[];
};

async function createCase(payload: CreateCasePayload) {
  const response = await api.post("/api/cases", payload);
  return response.data;
}

async function fetchIntakeFields() {
  const response = await api.get<IntakeFieldsResponse>(
    "/api/settings/intake-fields",
  );

  return response.data.data;
}

function getSimpleSelectOptions(options: unknown) {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.filter(
    (option): option is string =>
      typeof option === "string" && option.trim().length > 0,
  );
}

function getCreateCaseError(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data as CreateCaseErrorResponse | undefined;
  }

  return undefined;
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
  const [intakeData, setIntakeData] = useState<Record<string, string>>({});
  const [missingRequiredIntakeFields, setMissingRequiredIntakeFields] =
    useState<string[]>([]);

  const {
    data: intakeFields = [],
    isLoading: isLoadingIntakeFields,
    isError: isIntakeFieldsError,
  } = useQuery({
    queryKey: ["settings", "intake-fields"],
    queryFn: fetchIntakeFields,
  });

  const mutation = useMutation({
    mutationFn: createCase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      onCancel();
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const missingFields = activeIntakeFields
      .filter((field) => field.isRequired)
      .filter((field) => !(intakeData[field.key] ?? "").trim())
      .map((field) => field.label);

    if (missingFields.length > 0) {
      setMissingRequiredIntakeFields(missingFields);
      return;
    }

    setMissingRequiredIntakeFields([]);

    const submittedIntakeData = Object.fromEntries(
      Object.entries(intakeData).filter(([, value]) => value.trim() !== ""),
    );

    mutation.mutate({
      title,
      description: description || undefined,
      customerName,
      customerEmail: customerEmail || undefined,
      customerPhone: customerPhone || undefined,
      priority,
      intakeData: submittedIntakeData,
    });
  }

  function updateIntakeValue(key: string, value: string) {
    setIntakeData((current) => ({
      ...current,
      [key]: value,
    }));
    setMissingRequiredIntakeFields([]);
  }

  const activeIntakeFields = intakeFields.filter((field) => field.isActive);
  const createCaseError = getCreateCaseError(mutation.error);

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

      {isLoadingIntakeFields && (
        <div className="soft-empty">Loading intake fields...</div>
      )}

      {isIntakeFieldsError && (
        <div className="form-error">
          Could not load intake fields. You can still create the case.
        </div>
      )}

      {activeIntakeFields.length > 0 && (
        <div className="form-section">
          <div className="form-section-header">
            <h3>Intake details</h3>
            <p>Additional structured information for this case.</p>
          </div>

          <div className="form-grid">
            {activeIntakeFields.map((field) => {
              const value = intakeData[field.key] ?? "";
              const label = `${field.label}${field.isRequired ? " (required)" : ""}`;

              if (field.fieldType === "textarea") {
                return (
                  <label className="full-span" key={field.id}>
                    {label}
                    <textarea
                      required={field.isRequired}
                      placeholder={field.placeholder ?? undefined}
                      value={value}
                      onChange={(event) =>
                        updateIntakeValue(field.key, event.target.value)
                      }
                    />
                    {field.helpText && <span>{field.helpText}</span>}
                  </label>
                );
              }

              if (field.fieldType === "select") {
                const options = getSimpleSelectOptions(field.options);

                return (
                  <label key={field.id}>
                    {label}
                    <select
                      required={field.isRequired}
                      value={value}
                      onChange={(event) =>
                        updateIntakeValue(field.key, event.target.value)
                      }
                    >
                      <option value="">Select an option</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {field.helpText && <span>{field.helpText}</span>}
                  </label>
                );
              }

              const inputType =
                field.fieldType === "number" || field.fieldType === "date"
                  ? field.fieldType
                  : "text";

              return (
                <label key={field.id}>
                  {label}
                  <input
                    required={field.isRequired}
                    type={inputType}
                    placeholder={field.placeholder ?? undefined}
                    value={value}
                    onChange={(event) =>
                      updateIntakeValue(field.key, event.target.value)
                    }
                  />
                  {field.helpText && <span>{field.helpText}</span>}
                </label>
              );
            })}
          </div>
        </div>
      )}

      {missingRequiredIntakeFields.length > 0 && (
        <div className="form-error">
          Missing required intake fields:{" "}
          {missingRequiredIntakeFields.join(", ")}.
        </div>
      )}

      {mutation.isError && (
        <div className="form-error">
          {createCaseError?.message ??
            "Failed to create case. Check that your backend is running."}
          {createCaseError?.missingFields?.length ? (
            <span> Missing fields: {createCaseError.missingFields.join(", ")}.</span>
          ) : null}
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
