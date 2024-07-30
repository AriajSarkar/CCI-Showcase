"use client"
import React from 'react';

interface SVGPreviewProps {
    SVGComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    alt: string;
}

const SVGPreview: React.FC<SVGPreviewProps> = ({ SVGComponent, alt }) => (
    <div className="flex justify-center mb-4">
        <SVGComponent className="w-40 h-40" aria-label={alt} />
    </div>
);

export default SVGPreview;
