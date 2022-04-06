import { GetStaticProps } from 'next'
import Header from '../components/Header'
import Head from 'next/head'
import Link from 'next/link'
import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'

import { FiCalendar, FiUser } from 'react-icons/fi'

import commonStyles from '../styles/common.module.scss'
import styles from './home.module.scss'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

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
  function loadMore() {

  }

  return (
    <>
      <Head>
        <title>Space traveling</title>
      </Head>

      <main className={commonStyles.container}>
        <Header />

        <div className={styles.posts}>
          {
            postsPagination.results.map(post => (
              <Link key={post.uid} href={`/posts/preview/${post.uid}`}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <div>
                    <FiCalendar />
                    <time>{
                      format(
                        new Date(post.first_publication_date),
                        "d MMM yyyy",
                        {
                          locale: ptBR
                        }
                      )}
                    </time>
                    <FiUser /><p>{post.data.author}</p>
                  </div> 
                </a>
              </Link>
            ))
          }
        </div>

        {
          postsPagination.next_page !== null && (
            <button className={styles.button_more} onClick={loadMore}>
              Carregar mais posts
            </button>
          )
        }
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
