"use client";
import { useState } from 'react';
import * as Icons from '@ariajdev/company-colored-icon'; // Import all SVG components from your package
import SVGPreview from '../components/SVGPreview';
import CodeSnippet from '../components/CodeSnippet';
import DarkModeToggle from '../components/DarkModeToggle'; // Import the DarkModeToggle component
import { searchSVGs } from '../utils/search';

const ICONS_LIST = Object.keys(Icons) as Array<keyof typeof Icons>;

const IndexPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const filteredIcons = searchSVGs(ICONS_LIST, searchQuery);

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <DarkModeToggle />
      <h1 className="text-4xl font-bold mb-6 dark:text-gray-100">SVG Preview</h1>
      <input
        type="text"
        placeholder="Search icons..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-3 border rounded mb-6 w-full dark:bg-gray-800 dark:text-gray-200 bg-gray-100 text-gray-900"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredIcons.map((iconName) => {
          const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType;

          return (
            <div
              key={iconName}
              className="border rounded p-4 cursor-pointer transition-transform transform hover:scale-105 dark:border-gray-700 dark:bg-gray-800 border-gray-300 bg-white flex flex-col items-center justify-center"
              onClick={() => handleIconClick(iconName)}
            >
              <div className="flex items-center justify-center mb-2">
                <IconComponent aria-label={iconName} />
              </div>
              <p className="text-sm font-semibold dark:text-gray-200">{iconName}</p>
            </div>
          );
        })}
      </div>

      {selectedIcon && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-4xl w-full relative">
            <button
            type='button'
              onClick={() => setSelectedIcon(null)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 text-2xl"
            >
              &times;
            </button>
            <div className="mb-4">
              <SVGPreview
                SVGComponent={Icons[selectedIcon as keyof typeof Icons] as React.ComponentType}
                alt={selectedIcon}
              />
            </div>
            <CodeSnippet
              code={`<${selectedIcon} aria-label="${selectedIcon}" />`}
              onCopy={() => handleCopyCode(`<${selectedIcon} aria-label="${selectedIcon}" />`)}
            />
            {copied && <p className="text-green-500 mt-2 text-center">Copied to clipboard!</p>}
            <p className="text-lg font-semibold text-center dark:text-gray-200 mt-4">{selectedIcon}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
