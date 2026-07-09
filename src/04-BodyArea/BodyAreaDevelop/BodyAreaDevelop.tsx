import githubSnapshot from "../../99-generated/githubSnapshot.json";
import BodyAreaDevelopBlock from "./BodyAreaDevelopBlock"

function BodyAreaDevelop() {
  const repos = githubSnapshot.repos as any[];

  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        boxSizing: 'border-box',
        background: '#f6f7f9',
        padding: '22px clamp(12px, 3vw, 32px)'
      }}
    >
        <div
          style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: 'min(100%, 1040px)',
          margin: '0 auto',
          textAlign: 'left'
        }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              padding: '0 2px 4px'
            }}
          >
            <div>
              <p
                style={{
                  color: '#727985',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'DelaGothicOne-Regular'
                }}
              >
                Development
              </p>
              <p
                style={{
                  color: '#727985',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'Rajdhani'
                }}
              >
                Current Projects
              </p>
            </div>
            <span
              style={{
                flex: '0 0 auto',
                color: '#555d6b',
                background: '#ffffff',
                border: '1px solid #d9dde5',
                borderRadius: '999px',
                padding: '5px 10px',
                fontSize: '13px'
              }}
            >
              {repos.length} repos
            </span>
          </div>

          { repos.map((repo, index)=>(
            <BodyAreaDevelopBlock
              key={repo.id ?? repo.full_name ?? index}
              p_index={index}
            />
          )) }
        </div>
    </section>
  );
};

export default BodyAreaDevelop;
