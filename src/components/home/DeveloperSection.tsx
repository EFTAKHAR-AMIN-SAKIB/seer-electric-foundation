import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, Cpu, ExternalLink } from 'lucide-react';

export const DeveloperSection: React.FC = () => {
  const [tab, setTab] = useState<'solidity' | 'agent'>('solidity');
  const [copied, setCopied] = useState(false);

  const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { IConditionalTokens } from "@gnosis/conditional-tokens/contracts/IConditionalTokens.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SeerMarketAdapter {
    IConditionalTokens public immutable ctf;
    IERC20 public immutable sDAI; // Yield-bearing collateral (5.2% APY)

    constructor(address _ctf, address _sDAI) {
        ctf = IConditionalTokens(_ctf);
        sDAI = IERC20(_sDAI);
    }

    /// @notice Splits sDAI into complementary YES and NO conditional tokens
    function splitPosition(bytes32 parentCollectionId, bytes32 conditionId, uint256 amount) external {
        sDAI.transferFrom(msg.sender, address(this), amount);
        sDAI.approve(address(ctf), amount);
        
        uint256[] memory partition = new uint256[](2);
        partition[0] = 1; // YES slot
        partition[1] = 2; // NO slot
        
        ctf.splitPosition(address(sDAI), parentCollectionId, conditionId, partition, amount);
    }
}`;

  const agentCode = `import { SeerClient } from '@seer-pm/sdk';
import { parseUnits } from 'viem';

// Autonomous AI Agent evaluating grant DAG edge weights
const seer = new SeerClient({ chainId: 100, privateKey: process.env.AGENT_KEY });

async function calibrateCohortWeights(cohortId: string) {
  const astMetrics = await parseRepositoryTelemetry('ethereum/consensus-specs');
  const candidateWeight = astMetrics.originalityScore * 0.32; // Calibrated DAG weight

  // Stake sDAI on scalar UP token for this edge
  const tx = await seer.deep.calibrateWeight({
    projectId: 'deep-eth-core',
    weight: candidateWeight,
    stakeCollateral: parseUnits('500', 18), // 500 sDAI
  });
  console.log('Juror calibration confirmed:', tx.hash);
}`;

  const currentCode = tab === 'solidity' ? solidityCode : agentCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-signal-cyan" />
            <h3 className="text-xl font-extrabold text-text-primary">
              Developer &amp; AI Agent Integration SDK
            </h3>
          </div>
          <p className="text-xs text-text-secondary font-mono mt-0.5">
            Composable Solidity CTF interfaces &amp; Python / TypeScript agent evaluation client
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-card border border-subtle rounded-xl font-mono text-xs">
            <button
              onClick={() => setTab('solidity')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                tab === 'solidity' ? 'bg-ef-violet text-white font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Solidity (CTF Adapter)
            </button>
            <button
              onClick={() => setTab('agent')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                tab === 'agent' ? 'bg-ef-violet text-white font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              TypeScript (AI Agent SDK)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-card border border-subtle hover:bg-elevated text-text-muted hover:text-text-primary transition-colors text-xs flex items-center gap-1.5"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-signal-yes" /> : <Copy className="w-4 h-4" />}
            <span className="font-mono text-[11px] hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <div className="relative rounded-3xl bg-abyss border border-subtle p-5 font-mono text-xs overflow-x-auto shadow-inner">
        <pre className="text-text-secondary leading-relaxed">
          <code>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
};
