import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { MarkdownResult } from "../utils";

const ZaisteReactMarkdown = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          }
          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    />
  );
};

export default ZaisteReactMarkdown;
