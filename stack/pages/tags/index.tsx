import React from 'react';
import Mainlayout from '@/Layout/Mainlayout';

export default function TagsPage() {
    return (
        <Mainlayout>
            <div className="py-8 w-full">
                <h1 className="text-2xl font-bold mb-4">Tags</h1>
                <p className="text-gray-500 mb-6">
                    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-sm text-yellow-700">
                        <strong>Feature Context:</strong> This page is a placeholder for the Tags feature. The core Q&A functionality is fully active!
                    </p>
                </div>
            </div>
        </Mainlayout>
    );
}
