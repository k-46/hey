import React from 'react';
import type { EvaluationResult, Rubric } from '../types';

interface EvaluationResultsProps {
  results: EvaluationResult[];
  rubric: Rubric[];
}

export function EvaluationResults({ results, rubric }: EvaluationResultsProps) {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  const maxPossibleScore = rubric.reduce((sum, criteria) => sum + criteria.maxScore, 0);
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Evaluation Results</h2>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600">Total Score</p>
            <p className="text-3xl font-bold">{totalScore}/{maxPossibleScore}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Percentage</p>
            <p className="text-3xl font-bold text-blue-600">{percentage}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result) => {
          const criteriaDetails = rubric.find(r => r.id === result.criteriaId);
          return (
            <div key={result.criteriaId} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{criteriaDetails?.criteria}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{result.score}</span>
                  <span className="text-gray-500">/ {criteriaDetails?.maxScore}</span>
                </div>
              </div>
              <p className="text-gray-600">{result.feedback}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}