import React, {useContext, useState} from 'react';
import Buttons from '../Button/Button';
import BasicTextFields from '../TextField/TextField';
import getToken from '../../Api/GetToken';

import './comments.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import { CircularProgress } from '@material-ui/core';

function Comments({actionButtonText, parentId, avatarSize, setCommentList, commentList}) {
	const { setUser, user } = useContext(UserContext);
	const { id: videoId } = useParams();
	const saveCommentUrl = `${REACT_APP_DEV_BASE_URL}/comment/${videoId}`;
	const [commentFieldFocus, setCommentFieldFocus] = useState(false);

 
	const [comment, setComment] = useState("");
	const [isSubmitting, setSubmitting] = useState(false);
	const [result, setResult]= useState('');
	const [error, setError]= useState(false);
	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
	let token;
	

		const getNewToken = async () => {
			const response = await getToken();
			if (response.success) {
				const { payload } = response;
				token = payload.token;
				localStorage.setItem('tokenExpiry', payload.tokenExpiry);
				setUser(() => payload);
			}
		};


	const handleComment = async(e) => {
			e.preventDefault();
			setSubmitting(true);
			if (Date.now() >= +tokenExpiry * 1000) {
				await getNewToken();
			}
			try {
				const res = await fetch(saveCommentUrl, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token ||user.token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({comment, responseTo: parentId}),
				});
				const data = await res.json();
				setSubmitting(false);
				setResult(data);
				setCommentList([data.payload, ...commentList]);
				return data;
			} catch (err) {
				setError(err);
			}
	}

  return (
		<div className="comments">
		{!isSubmitting ? (<>
			<div className="comments-field-container">
					<img style={{width: avatarSize, borderRadius: '50%'}}
						alt='channel'
						src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
					/>
        <BasicTextFields
				name='comment'
				handleChange={(e) => setComment(e.target.value)}
				id='standard-full-width'
				fullWidth="fullwidth"
				multiline="multiline"
				handleFocus={() => setCommentFieldFocus(true)}
				placeholder='Add a public comment...'
			/></div>
			{commentFieldFocus && <div className='comment-buttons'>
				<Buttons handleClick={() => setCommentFieldFocus(!commentFieldFocus)}>Cancel</Buttons>
				<Buttons handleClick={handleComment}  variant='contained' color="primary" disabled={!comment}>{actionButtonText}</Buttons>
			</div>}
		</>): <CircularProgress/>}
		</div>
	);
}

export default Comments;
