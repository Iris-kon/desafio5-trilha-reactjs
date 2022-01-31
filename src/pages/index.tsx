import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import Head from 'next/head';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Space traveling</title>
      </Head>

      <main className={styles.container}>
        <Header />

        {postsPagination.results.map(post => {
          <div key={post.uid}>
            <p>{post.first_publication_date}</p>
          </div>
        })}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
    ], {
      fetch: [
        'publication.title',
        'publication.subtitle',
        'publication.first_publication_date',
        'publication.author',
      ],
      pageSize: 3
  }) as PostPagination;

  return {
    props: {
      postsPagination: {...postsResponse}
    }
  }
};
