import React from 'react';
import { Badge } from '../ui/Badge';

export function ClaimCard({ claim }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'not_independently_verified':
      case 'verification_required':
        return <Badge variant="warning">Verification Required</Badge>;
      case 'warning_identified':
      case 'high_danger':
        return <Badge variant="danger">High Warning</Badge>;
      case 'verified':
        return <Badge variant="sage">Independently Verified</Badge>;
      default:
        return <Badge variant="neutral">Under Review</Badge>;
    }
  };

  return (
    <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[22px] p-5 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#806D63]">
          {claim.classification || 'Extracted Claim'}
        </span>
        {getStatusBadge(claim.status)}
      </div>

      <div className="p-3 bg-[#F8F0EB] rounded-xl border border-[#E8D9D0] font-medium text-sm text-[#34251F]">
        "{claim.text}"
      </div>

      <div className="space-y-2 text-xs text-[#806D63]">
        <p>
          <strong className="text-[#34251F]">Explanation: </strong>
          {claim.explanation}
        </p>
        {claim.evidence && (
          <p>
            <strong className="text-[#34251F]">Available Evidence: </strong>
            {claim.evidence}
          </p>
        )}
      </div>
    </div>
  );
}
