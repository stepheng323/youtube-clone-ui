import React, {useState} from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { getRelativeTime } from '../../Utils';
import Comment from '../Comments/Comments';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';

import './single-comment.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';


function SingleComment({id, showReply, toggleReply, commenter, date, content, likesCount, dislikesCount, setCommentList, commentList }) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

	const fetchNext = async() => {
    setPage(page => page + 1)
      const getMoreVideos = async () => {
        const response = await fetch(`${REACT_APP_DEV_BASE_URL}/comment/${id}?page=${page + 1}&limit=8`);
        const result = await response.json();
        if(result.success){
          setCommentList(commentList.concat(...result.payload.data));
        }
        if(!result.payload.next){
          setHasMore(false)
        }
      };
      getMoreVideos();
  }

  return (
    <div className="single-comment">
      	<InfiniteScroll style={{ overflowY: 'hidden' }}
      dataLength={commentList.length}
      next={fetchNext}
			hasMore={hasMore}
      loader={<div className=""><CircularLoading/></div>}
      >
      <img style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '.7em'}}
						alt='channel'
						src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
					/>
      <div className="single-comment-content">
        <div className="single-comment-content-user-info">
          <p className="single-comment-content-commenter">{commenter}</p>
          <p className="single-comment-content-date">{getRelativeTime(date)} ago</p>
        </div>
        <p className="single-comment-content-details">{content}</p>
        <div className="single-comment-content-controls">
          <div className="single-comment-icon">
            <ThumbUpAltIcon className="single-comment-icons" />
            <p>{likesCount > 0 ? likesCount : ''}</p>
            </div>
          <div className="single-comment-icon">
             <ThumbDownAltIcon className="single-comment-icons"/>
             <p style={{fontSize: '14px'}}>{dislikesCount > 0 ? dislikesCount : ''}</p>
             </div>
          <p style={{cursor: 'pointer'}} onClick={() => toggleReply(id)} className="single-comment-icon single-comment-reply">REPLY</p>
        </div>
          {showReply === id  && <Comment parentId={id} avatarSize="25px" actionButtonText="reply"/>}
      </div>
      </InfiniteScroll>
    </div>
  )
}

export default SingleComment
