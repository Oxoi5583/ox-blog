import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import githubSnapshot from "../../99-generated/githubSnapshot.json";

interface BodyAreaDevelopBlockReadmeArgs {
  p_index: number;
}

function BodyAreaDevelopBlockReadme({ p_index } : BodyAreaDevelopBlockReadmeArgs){
    const readmeContent = githubSnapshot.repos[p_index].readme?.content?.trim();

    if (!readmeContent) {
        return null;
    }

    return (
        <div
            style={{
                maxHeight: '520px',
                overflow: 'auto',
                borderTop: '1px solid #e4e7ec',
                background: '#fcfcfd',
                padding: '18px 22px',
                color: '#303642',
                fontSize: '15px',
                lineHeight: 1.65
            }}
        >
            <Markdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}>
                {readmeContent}
            </Markdown>
        </div>
    )
}

export default BodyAreaDevelopBlockReadme;
