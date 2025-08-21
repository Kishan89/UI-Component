import { useState } from "react";
import InputField from "./components/InputField/InputField";
import DataTable, { type Column } from "./components/DataTable/DataTable";
import "./index.css";

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", age: 28, city: "New York" },
  { id: 2, name: "Bob Smith", age: 34, city: "London" },
  { id: 3, name: "Charlie Brown", age: 45, city: "Paris" },
  { id: 4, name: "Diana Miller", age: 22, city: "Tokyo" },
  { id: 5, name: "Ethan Hunt", age: 38, city: "Berlin" },
];

const mockColumns: Column<User>[] = [
  { key: "col1", title: "Name", dataIndex: "name", sortable: true },
  { key: "col2", title: "Age", dataIndex: "age", sortable: true },
  { key: "col3", title: "City", dataIndex: "city", sortable: true },
];

function App() {
  const [defaultInput, setDefaultInput] = useState("");
  const [filledInput, setFilledInput] = useState("");
  const [ghostInput, setGhostInput] = useState("");
  const [largeInput, setLargeInput] = useState("");
  const [smallInput, setSmallInput] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [password, setPassword] = useState("");

  return (
    <div className="p-8 min-h-screen font-sans bg-gradient-to-r from-[var(--color-gradient-teal)] via-[var(--color-gradient-charcoal)] to-[var(--color-gradient-aqua)] animate-gradient-background text-[var(--color-text-primary)]">
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold drop-shadow-md tracking-tight text-white">
          UI Components Showcase
        </h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-white">
          Demo of flexible InputField and DataTable components with React,
          TypeScript, and TailwindCSS.
        </p>
      </header>

      {/* InputField Section */}
      <section className="bg-[var(--color-surface)]/10 p-8 rounded-3xl shadow-2xl border border-[var(--color-border)] animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-[var(--color-accent-blue)] pb-2 text-white">
          1. InputField Component 🎯
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <InputField
            label="Default Input"
            placeholder="Enter your name"
            helperText="Type anything to see the value update."
            value={defaultInput}
            onChange={(e) => setDefaultInput(e.target.value)}
          />
          <InputField
            label="Invalid Input"
            placeholder="example@mail.com"
            invalid={!invalidInput.includes("@")}
            errorMessage="Please enter a valid email address."
            value={invalidInput}
            onChange={(e) => setInvalidInput(e.target.value)}
          />
          <InputField
            label="Disabled Input"
            placeholder="This field is disabled"
            disabled
            helperText="This field is not editable."
            value="Can't touch this"
          />
          <InputField
            label="Filled Variant"
            placeholder="Looks clean and modern"
            variant="filled"
            value={filledInput}
            onChange={(e) => setFilledInput(e.target.value)}
          />
          <InputField
            label="Ghost Variant"
            placeholder="Minimalistic style"
            variant="ghost"
            value={ghostInput}
            onChange={(e) => setGhostInput(e.target.value)}
          />
          <InputField
            label="Large Size"
            placeholder="Large input field"
            size="lg"
            value={largeInput}
            onChange={(e) => setLargeInput(e.target.value)}
          />
          <InputField
            label="Small Size"
            placeholder="Small input field"
            size="sm"
            helperText="Ideal for compact forms."
            value={smallInput}
            onChange={(e) => setSmallInput(e.target.value)}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </section>

      {/* DataTable Section */}
      <section className="bg-[var(--color-surface)]/10 p-8 rounded-3xl shadow-2xl border border-[var(--color-border)] animate-fade-in-up delay-200">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-[var(--color-accent-blue)] pb-2 text-white">
          2. DataTable Component 📊
        </h2>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Default Table with Sorting
            </h3>
            <DataTable<User> data={mockUsers} columns={mockColumns} />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Selectable Table
            </h3>
            <DataTable<User>
              data={mockUsers}
              columns={mockColumns}
              selectable
              onRowSelect={(rows) => setSelectedUsers(rows)}
            />
            {selectedUsers.length > 0 && (
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]/80">
                Selected: {selectedUsers.map((u) => u.name).join(", ")}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Loading State
            </h3>
            <DataTable<User> data={[]} columns={mockColumns} loading />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Empty State
            </h3>
            <DataTable<User> data={[]} columns={mockColumns} />
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-[var(--color-text-secondary)] py-6">
        Designed & Built by Kishan
      </footer>
    </div>
  );
}

export default App;
