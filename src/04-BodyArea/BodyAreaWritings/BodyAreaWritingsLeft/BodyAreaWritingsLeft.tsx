import PostArea from './PostArea/PostArea';

function BodyAreaLeft() {
    return (
        <div
            style={{
                display: 'flex',
                overflowY: 'hidden',
                height: 'calc(100dvh - 35px)',
                width: '100%',
            }}
        >
            <PostArea/>
        </div>
    );
}

export default BodyAreaLeft
