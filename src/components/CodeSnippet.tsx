"use client"
import React from 'react';

interface CodeSnippetProps {
    code: string;
    onCopy: () => void;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, onCopy }) => (
    <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded border dark:border-gray-600">
        <pre>
            <code>{code}</code>
        </pre>
        <button
            type='button'
            onClick={onCopy}
            className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Copy
        </button>
    </div>
);

export default CodeSnippet;
