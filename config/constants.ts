/** Expected UI copy — single source of truth for assertions. */
export const Messages = {
  radioButton: {
    impressiveChecked: 'You have checked Impressive',
  },
  buttons: {
    dynamicClickDone: 'You have done a dynamic click',
  },
  links: {
    notFoundLink: 'Link has responded with staus 404 and status text Not Found',
  },
  dynamicProperties: {
    visibleAfterButton: 'Visible After 5 Seconds',
  },
} as const;

export const Genders = ['Male', 'Female', 'Other'] as const;
export type Gender = (typeof Genders)[number];

export const Hobbies = ['Sports', 'Reading', 'Music'] as const;

/** Test data for Task 109 — values satisfy client-side validation min lengths. */
export const PracticeFormData = {
  name: 'Mohamed Gedo',
  email: 'mohamed.g@example.com',
  gender: 'Male' satisfies Gender,
  mobile: '1234567890',
  subjects: 'Maths',
  address: '123 Automation Street, Cairo',
  state: 'NCR',
  city: 'Lucknow',
} as const;

export type PracticeFormRecord = typeof PracticeFormData;

/** Relative path from project root for file-upload tests. */
export const TestFiles = {
  sampleUpload: 'testdata/sample-upload.txt',
  samplePicture: 'testdata/sample-upload.txt',
} as const;

/** Values satisfy jQuery Validate rules on RegisterForm (min lengths on age/salary/department). */
export const WebTableData = {
  firstName: 'mohamed',
  lastName: 'gedo',
  email: 'mohamed.g@example.com',
  age: '1990',
  salary: '10000000000000000000',
  department: 'Quality Control Dept',
} as const;

export type EmployeeRecord = typeof WebTableData;