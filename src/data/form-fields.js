export const countries = [
  "United States",
  "United Kingdom",
  "Algeria",
  "India",
  "France",
  "Canada",
];
export const basicFields = [
  {
    key: "name",
    label: "Name",
    placeholder: "John Doe",
    icon: "user",
    required: true,
  },
  {
    key: "company",
    label: "Company",
    placeholder: "ACME Inc.",
    icon: "store",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "john.doe@example.com",
    icon: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Phone No",
    type: "tel",
    placeholder: "412 2150 451",
    icon: "phone",
    required: true,
  },
  {
    key: "message",
    label: "Message",
    kind: "textarea",
    placeholder: "Hi, Do you have a moment to talk Joe?",
    icon: "chats",
    required: true,
  },
];
export const accountFields = [
  { section: "Account Details" },
  {
    key: "username",
    label: "Username",
    placeholder: "John Doe",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "john.doe@example.com",
    required: true,
  },
  { key: "password", label: "Password", type: "password", required: true },
  { section: "Personal Info" },
  {
    key: "fullname",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
  },
  { key: "country", label: "Country", items: countries, required: true },
  { key: "birthdate", label: "Birth Date", type: "date" },
  { key: "phone", label: "Phone No", type: "tel", placeholder: "412 2150 451" },
];
export const personalFields = [
  {
    key: "firstname",
    label: "First Name",
    placeholder: "John",
    required: true,
  },
  { key: "lastname", label: "Last Name", placeholder: "Doe", required: true },
  { key: "country", label: "Country", items: countries },
  {
    key: "language",
    label: "Language",
    items: ["English", "French", "Arabic", "Hindi"],
  },
  { key: "birthdate", label: "Birth Date", type: "date" },
  { key: "phone", label: "Phone no", type: "tel", placeholder: "412 2150 451" },
];
export const addressFields = [
  { key: "name", label: "Full Name", required: true },
  { key: "phone", label: "Phone No", type: "tel", required: true },
  { key: "address", label: "Address", required: true, wide: true },
  { key: "pincode", label: "Pincode", required: true },
  { key: "landmark", label: "Landmark" },
  { key: "city", label: "City", required: true },
  { key: "state", label: "State", required: true },
  {
    key: "type",
    label: "Address Type",
    kind: "radio",
    options: [
      "Home (All day delivery)",
      "Office (Delivery between 10 AM – 5 PM)",
    ],
    value: "Home (All day delivery)",
    wide: true,
  },
];
