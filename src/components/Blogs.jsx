import { BlogCard } from './BlogCard';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blogs = () => {
  const { blogs, hasMore, nextPage, fetchBlogs } = useContext(GlobalContext);

  useEffect(() => {
    //FETCH BLOGS ONLY IF THERE ARE FOLLOWING PAGES
    if (hasMore) fetchBlogs(nextPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='blog-section'>
      <div className='blogs'>
        <InfiniteScroll
          dataLength={blogs.length}
          next={() => {
            fetchBlogs(nextPage);
          }}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <p
              style={{
                textAlign: 'center',
                fontSize: '1.1rem',
              }}
            >
              You&apos;ve seen all the blogs.
            </p>
          }
        >
          {blogs.map((blog) => {
            const { id, user, category, title, content, date } = blog;
            return (
              <BlogCard
                key={id}
                id={id}
                title={title}
                content={content}
                date={date}
                user={user}
                category={category}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Blogs;
