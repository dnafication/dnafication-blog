// @flow
import React from 'react';
import { getContactHref, getIcon } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';
import Icon from '../../Icon';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <h3>Author: {author.name}</h3>
      <p className={styles['author__bio']}>
        {author.bio}
        <a
          className={styles['author__bio-twitter']}
          href={getContactHref('twitter', author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{author.name}</strong> on Twitter{' '}
          <Icon icon={getIcon('twitter')} />
        </a>
      </p>
    </div>
  );
};

export default Author;
