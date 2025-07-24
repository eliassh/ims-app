# 📦 ims-app

A modern inventory management system built with **Vue 3 (Composition API)**, **Vite**, and **Tailwind CSS**, deployed on **Cloudflare Pages** and backed by **Supabase**.

---

## ✨ Features

- Inventory item CRUD (create, read, update, delete)
- Inventory name, category and status filtering
- Backend using Supabase
- Styled using Tailwind CSS
- Rich UI components built with PrimeVue
- Flat-config ESLint + Stylelint setup
- Code formatting enforced with Prettier for consistency
- Responsive and accessible component design

---

## 🧰 Tech Stack

- **Frontend:** Vue 3, Vite, Tailwind CSS, PrimeVue
- **Backend:** Supabase
- **Deployment:** Cloudflare Pages / Workers
- **Linting & Formatting:** Stylelint, ESLint, Prettier
- **Security:** Supabase RLS rules

---

## 🧠 IDE Setup

- [Visual Studio Code](https://code.visualstudio.com/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/ims-app.git
cd ims-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

### 4. Start development

```bash
npm run dev
```

---

## ⚙️ Available Scripts

| Script                   | Description                      |
| ------------------------ | -------------------------------- |
| `npm run dev`            | Start development server         |
| `npm run build`          | Build app for production         |
| `npm run preview`        | Preview production build locally |
| `npm run lint`           | Run ESLint                       |
| `npm run lint:style`     | Run Stylelint                    |
| `npm run lint:style:fix` | Auto-fix Stylelint issues        |

---

## 🧪 Linting Setup

- **ESLint:** Vue 3 + TypeScript + Flat Config
- **Stylelint:** Tailwind CSS + SCSS + Prettier + BEM
- Fix on save enabled via VSCode for `.vue`, `.ts`, `.scss`

---

## 🔍 ESLint Details

The project uses a robust, modern ESLint setup designed for Vue 3 and TypeScript with flat config support. It enforces code quality, stylistic consistency, and best practices across the codebase.

### ✅ Key Features

#### 📦 Plugins Used

- `@vue/eslint-config-typescript`
- `eslint-plugin-vue`
- `@stylistic/eslint-plugin`
- `eslint-plugin-import-x`
- `eslint-plugin-unused-imports`

#### 📚 Rules Enforced

- **Flat config setup** using `defineConfigWithVueTs` for Vue + TypeScript
- **Vue 3 Composition API safety rules**
  - Disallows props destructuring that breaks reactivity (`vue/no-setup-props-reactivity-loss`)
  - Prevents use of refs in unsupported operand positions (`vue/no-ref-as-operand`)
  - Blocks unsafe `v-html` usage (`vue/no-v-html`)
  - Forbids direct mutation of props (`vue/no-mutating-props`)
- **Import order & hygiene**
  - Automatically orders imports by group and alphabetically (`import-x/order`)
  - Enforces newline after imports (`import-x/newline-after-import`)
  - Flags unused imports and removes them automatically (`unused-imports/no-unused-imports`)
- **Type-safe import resolution** using `eslint-import-resolver-typescript`
- **Stylistic rules** via `@stylistic/eslint-plugin`:
  - 2-space indentation, always semicolons
  - Single quotes preferred
  - Consistent spacing and formatting for objects, arrays, and blocks
  - Configured to match Prettier-compatible expectations (via `skipFormatting`)
- **Ignore paths** for:
  - `dist/`, `dist-ssr/`, `coverage/`

## 🔍 Stylelint Details

The project uses a modern Stylelint configuration designed for Vue 3 SFCs, SCSS, and Tailwind CSS. It enforces code consistency, naming conventions, utility-class discipline, and clean style architecture.

### ✅ Key Features

#### 📦 Plugins Used

- `stylelint-scss`
- `stylelint-order`
- `stylelint-config-standard`
- `stylelint-config-standard-scss`
- `stylelint-config-prettier-scss`
- `stylelint-config-tailwindcss`
- `stylelint-config-html`
- `postcss-html` (for Vue SFC support)

#### 📚 Rules Enforced

- **Syntax parsing for `.vue` and `.html`**
  - Uses `postcss-html` to correctly lint `<style>` blocks in Vue SFCs
- **Tailwind-aware linting**
  - Compatible with utility-first class conventions and Tailwind’s special at-rules
- **SCSS support**
  - Enforces mixin call parentheses (`scss/at-mixin-argumentless-call-parentheses`)
  - Disallows redundant nesting (`scss/selector-no-redundant-nesting-selector`)
  - Requires spacing around SCSS variables (`scss/dollar-variable-empty-line-before`)
- **BEM naming conventions**
  - Custom regex patterns enforce consistent class and ID naming
- **Import-safe and rule-order enforcement**
  - Alphabetical property ordering (`order/properties-alphabetical-order`)
  - Declaration block ordering (`order/order`)
- **Color and function rules**
  - Long-form hex colors only (`color-hex-length: 'long'`)
  - Legacy comma-separated color functions (`color-function-notation: 'legacy'`)
  - Ignores custom SCSS functions (e.g. `map-get`, `theme`, `darken`, etc.)
- **Code clarity**
  - Restricts invalid pseudo-elements (`selector-pseudo-element-no-unknown`)
  - Enforces numeric alpha values instead of percentages (`alpha-value-notation: 'number'`)
- **Naming best practices**
  - `keyframes`, `class`, and `id` names follow kebab-case or camelCase patterns

### 📄 File types linted

- `.css`, `scss`, `.vue`, `.html`

## 📂 Project Structure

```
src/
├── assets/
├── components/
├── composables/
├── constants/
├── router/
├── services/
├── stores/
├── views/
└── App.vue
```

## 🚧 Upcoming Features

- Husky integration for Git hooks (e.g. pre-commit linting)
- Lint-staged setup to run ESLint and Stylelint only on staged files
- Commit message linting with Conventional Commits and commitlint