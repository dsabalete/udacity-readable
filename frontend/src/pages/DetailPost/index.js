import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPostAsync, votePostAsync } from '../../actions/post'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ActionButtons from '../../components/ActionButtons'
import FontAwesome from 'react-fontawesome'

class DetailPost extends Component {

	componentWillMount() {
		this.props.fetchPostAsync(this.props.match.params.id)
	}

	vote(voteValue) {
		const { id } = this.props.match.params
		this.props.votePostAsync(id, voteValue)
	}

	render() {
		const { post } = this.props
		if (!post) {
			return (
				<div className="alert alert-warning" role="alert">
					Post not found
				</div>
			)
		}

		// console.log(this.props)

		return (
			<div className="App">
				<Header />
				<div className="container">
					<article className="card">
						<FontAwesome name="hand-o-left"
							onClick={() => this.props.history.goBack()}
						/>
						<ActionButtons post={post} />
						<h4>{post.title}</h4>
						<p>{post.body}</p>
						<p>
							<FontAwesome name="calendar" /> {new Date(post.timestamp).toString().substr(0, 16)}
							<FontAwesome name="user" /> {post.author}
						</p>
						<p>
							<Link to={'/' + post.category}>
								<span className="badge badge-pill badge-secondary">{post.category}</span></Link>{" "}
							<span className="badge badge-pill badge-primary">{post.voteScore} votes </span>{" "}
							<FontAwesome name="thumbs-o-up" aria-hidden="true" onClick={() => this.vote('upVote')} />{" "}
							<FontAwesome name="thumbs-o-down" aria-hidden="true" onClick={() => this.vote('downVote')} />
						</p>
					</article>
				</div>
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({ post: state.post })
export default connect(mapStateToProps, {
	fetchPostAsync,
	votePostAsync
})(DetailPost)