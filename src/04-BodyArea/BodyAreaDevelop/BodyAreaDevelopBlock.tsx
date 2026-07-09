import { useState } from 'react';
import githubSnapshot from "../../99-generated/githubSnapshot.json";
import BodyAreaDevelopBlockCodebase from "./BodyAreaDevelopBlockCodebase";
import BodyAreaDevelopBlockReadme from "./BodyAreaDevelopBlockReadme";

interface BodyAreaDevelopBlockArgs{
    p_index : number
};

function BodyAreaDevelopBlock({ p_index } : BodyAreaDevelopBlockArgs) {
  const [isReadmeExpanded, setIsReadmeExpanded] = useState(false);
  const repo = githubSnapshot.repos[p_index];
  const readmeContent = repo.readme?.content?.trim();
  const metaItems = [
    repo.language,
    repo.default_branch ? `branch: ${repo.default_branch}` : undefined,
    typeof repo.stargazers_count === 'number' ? `stars: ${repo.stargazers_count}` : undefined,
  ].filter(Boolean);

  return (
    <article
      style={{
        overflow: 'hidden',
        border: '1px solid #d9dde5',
        borderRadius: '8px',
        background: '#ffffff',
        boxShadow: '0 10px 24px rgba(27, 35, 48, 0.07)'
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '18px',
          padding: '18px 20px',
          borderBottom: '1px solid #e4e7ec',
          background: '#fbfcfd'
        }}
      >
        <div
          style={{
            minWidth: 0
          }}
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#20242c',
              fontSize: '18px',
              fontWeight: 700,
              lineHeight: 1.2,
              textDecoration: 'none',
              overflowWrap: 'anywhere',
              fontFamily: 'Zen Maru Gothic'
            }}
          >
            {repo.full_name}
          </a>
          {repo.description && (
            <p
              style={{
                marginTop: '7px',
                color: '#596170',
                fontSize: '14px',
                lineHeight: 1.45,
                fontFamily: 'Zen Maru Gothic'
              }}
            >
              {repo.description}
            </p>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            alignContent: 'flex-start',
            gap: '6px',
            maxWidth: '360px',
            fontFamily: 'Zen Maru Gothic'
          }}
        >
          {metaItems.map((item) => (
            <span
              key={item}
              style={{
                color: '#4c5563',
                background: '#eef1f5',
                border: '1px solid #dde2ea',
                borderRadius: '999px',
                padding: '4px 9px',
                fontSize: '12px',
                lineHeight: 1.2,
                whiteSpace: 'nowrap'
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      <BodyAreaDevelopBlockCodebase p_index={p_index} />

      {readmeContent && (
        <section
          style={{
            borderTop: '1px solid #e4e7ec'
          }}
        >
          <button
            type="button"
            onClick={() => setIsReadmeExpanded((value) => !value)}
            aria-expanded={isReadmeExpanded}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              minHeight: '48px',
              border: 0,
              background: '#ffffff',
              color: '#20242c',
              cursor: 'pointer',
              textAlign: 'left',
              padding: '0 20px',
              fontSize: '14px',
              fontWeight: 700
            }}
          >
            <span>Description</span>
            <span
              style={{
                color: '#6a7280',
                fontFamily: 'var(--mono)',
                fontSize: '15px'
              }}
            >
              {isReadmeExpanded ? '-' : '+'}
            </span>
          </button>
          {isReadmeExpanded && (
            <BodyAreaDevelopBlockReadme p_index={p_index} />
          )}
        </section>
      )}
    </article>
  );
}

export default BodyAreaDevelopBlock;
