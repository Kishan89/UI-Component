# 🎨 UI Components Library

A small **UI component library** built with **React, TypeScript, TailwindCSS, and Storybook**.  
This project was created as part of a **React Component Development Assignment**.  

It includes two reusable components:

1. **InputField** – A flexible input component with validation and multiple states.  
2. **DataTable** – A simple yet extensible data table with sorting and row selection.  

---

## 🚀 Setup Instructions

Clone the repository and install dependencies:

```bash
# Clone repo
git clone https://github.com/Kishan89/UI-Component.git
cd ui-components

# Install dependencies
npm install


npm run dev

npm run storybook

src/
 ┣ components/
 ┃ ┣ InputField/
 ┃ ┃ ┣ InputField.tsx
 ┃ ┃ ┗ InputField.stories.tsx
 ┃ ┣ DataTable/
 ┃ ┃ ┣ DataTable.tsx
 ┃ ┃ ┗ DataTable.stories.tsx
 ┣ stories/
 ┃ ┣ button.css
 ┃ ┣ page.css
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx



## 🛠️ Approach

### 🔹 InputField
A flexible input component with support for:

- Label, placeholder, helper text, and error message  
- Variants: **filled, outlined, ghost**  
- Sizes: **small, medium, large**  
- States: **disabled, invalid, loading**  
- Optional: clear button, password toggle  
- Props are strongly typed with TypeScript (`InputFieldProps`)  
- Styled with TailwindCSS for consistency and responsiveness  
- Documented in Storybook with multiple stories for each variant and state  

---

###  DataTable
Displays tabular data with dynamic columns.  

Features include:  
- Column sorting  
- Row selection (single/multiple)  
- Loading state  
- Empty state  
- Generic typing with `DataTableProps<T>` for flexibility  
- Accessible (basic ARIA labels)  
- Documented in Storybook with demo datasets  

---

##  Components

###  InputField Usage
```tsx
<InputField
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email."
  errorMessage="Invalid email address"
  variant="outlined"
  size="md"
  invalid={false}
  disabled={false}
/>

<DataTable
  data={[
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
  ]}
  columns={[
    { key: "1", title: "Name", dataIndex: "name", sortable: true },
    { key: "2", title: "Age", dataIndex: "age", sortable: true },
  ]}
  selectable
  onRowSelect={(rows) => console.log(rows)}
/>
