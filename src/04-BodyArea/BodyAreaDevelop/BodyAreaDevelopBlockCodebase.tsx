import { useState } from 'react';
import githubSnapshot from "../../99-generated/githubSnapshot.json";

interface CodebaseNode {
  name?: string;
  path: string;
  github_url?: string;
  children?: CodebaseNode[];
}

interface BodyAreaDevelopBlockCodebaseArgs {
  p_index: number;
}

interface CodebaseTreeArgs {
  indent: number;
  nodes: CodebaseNode[];
}

interface CodebaseNodeItemArgs {
  indent: number;
  node: CodebaseNode;
}

function isFolder(node: CodebaseNode) {
  return (node.children?.length ?? 0) > 0;
}

function getNodeName(node: CodebaseNode) {
  return node.name ?? node.path.split('/').at(-1) ?? node.path;
}

function getFileType(node: CodebaseNode) {
  const name = getNodeName(node);
  const dotIndex = name.lastIndexOf('.');

  return dotIndex === -1 ? '' : name.slice(dotIndex + 1).toLowerCase();
}

function sortCodebaseNodes(nodes: CodebaseNode[]) {
  return [...nodes].sort((a, b) => {
    const aIsFolder = isFolder(a);
    const bIsFolder = isFolder(b);

    if (aIsFolder !== bIsFolder) {
      return aIsFolder ? -1 : 1;
    }

    if (!aIsFolder && !bIsFolder) {
      const typeCompare = getFileType(a).localeCompare(getFileType(b));

      if (typeCompare !== 0) {
        return typeCompare;
      }
    }

    return getNodeName(a).localeCompare(getNodeName(b));
  });
}

function countCodebaseFiles(nodes: CodebaseNode[]): number {
  return nodes.reduce((count, node) => {
    if (!isFolder(node)) {
      return count + 1;
    }

    return count + countCodebaseFiles(node.children ?? []);
  }, 0);
}

function CodebaseNodeItem({ indent, node }: CodebaseNodeItemArgs) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = isFolder(node);

  return (
    <li
      style={{
        color: '#2d333d',
        fontFamily: 'Zen Maru Gothic',
        fontSize: '13px',
        lineHeight: 1.5
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '24px',
          border: '1px solid #e6e8ee',
          background: isHovered ? '#e9edf3' : '#ffffff',
          padding: '2px 6px',
          transition: 'background 0.15s ease, border-color 0.15s ease'
        }}
      >
        <div 
          style={{
            width: indent * 5
          }}
        />
        {hasChildren ? (
          <button
            type="button"
            aria-label={isExpanded ? `Collapse ${node.path}` : `Expand ${node.path}`}
            onClick={() => setIsExpanded((value) => !value)}
            style={{
              width: '20px',
              height: '20px',
              marginRight: '6px',
              padding: 0,
              border: '1px solid #cfd5df',
              background: '#ffffff',
              color: '#424a57',
              cursor: 'pointer',
              lineHeight: '16px',
              fontFamily: 'var(--mono)'
            }}
          >
            {isExpanded ? '-' : '+'}
          </button>
        ) : (
          <span style={{
            display: 'inline-block',
            width: '26px'
          }} />
        )}

        <a
          href={node.github_url}
          title={node.path}
          target="_blank"
          rel="noreferrer"
          style={{
            color: hasChildren ? '#1f2937' : '#4d5664',
            fontWeight: hasChildren ? 700 : 400,
            textDecoration: 'none',
            overflowWrap: 'anywhere'
          }}
        >
          {node.name ?? node.path}
        </a>
      </div>

      {hasChildren && isExpanded && (
        <CodebaseTree indent={indent + 4} nodes={node.children ?? []} />
      )}
    </li>
  );
}

function CodebaseTree({ indent, nodes }: CodebaseTreeArgs) {
  const sortedNodes = sortCodebaseNodes(nodes);

  return (
    <div
      style={{
          maxHeight: '360px',
          overflow: 'auto',
          scrollbarWidth: 'thin',
          border: '1px solid #e0e5ec'
      }}
    >
      <ul style={{
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      }}>
        {sortedNodes.map((node) => (
          <CodebaseNodeItem key={node.path} indent={indent} node={node} />
        ))}
      </ul>
    </div>
  );
}

function BodyAreaDevelopBlockCodebase({ p_index }: BodyAreaDevelopBlockCodebaseArgs) {
  const repo = githubSnapshot.repos[p_index];
  const codebase = (repo.codebase ?? []) as CodebaseNode[];

  return (
    <section
      style={{
        padding: '16px 20px 18px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3px'
        }}
      >
        <p
          style={{
            color: '#20242c',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: 'Zen Maru Gothic'
          }}
        >
          Repository
        </p>
        <span
          style={{
            color: '#697281',
            fontSize: '12px',
            fontFamily: 'Zen Maru Gothic'
          }}
        >
          {countCodebaseFiles(codebase)} files
        </span>
      </div>
      <div
        style={{
          border: '1px solid #e0e5ec',
          background: '#f8fafc',
          padding: '3px 3px',
        }}
      >
        <CodebaseTree indent={4} nodes={codebase} />
      </div>
    </section>
  );
}

export default BodyAreaDevelopBlockCodebase;
