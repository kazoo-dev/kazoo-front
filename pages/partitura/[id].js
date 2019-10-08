import { get } from 'lodash';
import Router from 'next/router';
import React from 'react';
import { Grabacion } from '../../components/Grabacion';
import Layout from '../../components/Layout';

export default class PaginaDeGrabacion extends React.Component {
  render() {
    const id = get(Router, 'router.query.id')
    return (
      <Layout>
        {id && <Grabacion id={id} />}
      </Layout>
    );
  }
}
