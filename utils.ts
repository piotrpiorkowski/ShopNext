import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;

export const validateMMYY = (value: any) => {
  if (!value || !value.includes("/")) {
    return false;
  }
  const [month, year] = value.split("/");
  if (Number(month) > 12) {
    return false;
  }
  if (Number(year) < 22 || Number(year) > 33) {
    return false;
  }
  return true;
};

export const validatePostalCode = (value: any) => {
  if (!value || !value.includes("-")) {
    return false;
  }
  const [firstPart, secondPart] = value.split("-");
  if (Number(firstPart) > 99 || firstPart.length != 2) {
    return false;
  }
  if (Number(secondPart) > 999 || secondPart.length != 3) {
    return false;
  }
  return true;
};
