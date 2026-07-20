import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Send, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

function StarRating({ value, onChange, readOnly = false, size = 18 }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={readOnly ? 'cursor-default' : 'cursor-pointer'}>
          <Star
            size={size}
            className={
              (hover || value) >= star
                ? 'fill-accent text-accent'
                : 'text-slate-300'
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function Comments() {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function loadComments() {
    setLoadingComments(true);
    const res = await api.get('/comments');
    if (res.comments) {
      setComments(res.comments);
      setAverageRating(res.averageRating);
    }
    setLoadingComments(false);
  }

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please login first to leave a comment.');
      return;
    }
    if (!text.trim()) {
      setError('Comment text is required.');
      return;
    }
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    setSubmitting(true);
    const res = await api.post('/comments', { text: text.trim(), rating }, { auth: true });
    setSubmitting(false);

    if (!res.comment) {
      setError(res.message || 'Could not add your comment. Please try again.');
      return;
    }

    setComments((prev) => [res.comment, ...prev]);
    setText('');
    setRating(0);
    // refresh average rating from the server
    const refreshed = await api.get('/comments');
    if (refreshed.comments) setAverageRating(refreshed.averageRating);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-navy mb-2">
          Reviews &amp; Comments
        </h1>
        {averageRating && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <StarRating value={Math.round(averageRating)} readOnly size={16} />
            <span>
              {averageRating} out of 5 ({comments.length} reviews)
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-100 mb-10">
        <h2 className="font-semibold text-navy mb-4">
          Add your comment and rating
        </h2>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {!user && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-brand-light text-sm text-navy">
            Please{' '}
            <Link
              to="/login"
              className="text-brand font-semibold hover:underline">
              login
            </Link>{' '}
            to leave a comment.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Rating
            </label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Comment
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Share your experience..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60">
            <Send size={16} />
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {loadingComments && (
          <p className="text-sm text-slate-500 text-center py-8">Loading comments...</p>
        )}

        {!loadingComments && comments.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-8">
            No comments yet. Be the first to write one!
          </p>
        )}

        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-soft p-5 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-full bg-brand-light flex items-center justify-center text-brand">
                  <User size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{c.name}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(c.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StarRating value={c.rating} readOnly size={15} />
                <span className="text-sm font-semibold text-navy">
                  {c.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="text-sm text-ink mt-2">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
