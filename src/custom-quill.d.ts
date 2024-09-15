// src/custom-quill.d.ts
import * as Quill from 'quill';
import * as hljs from 'highlight.js';

declare module 'quill' {
  namespace Quill {
    interface SyntaxOptions {
      highlight?: (text: string) => string;
    }
  }
}
