import Head from 'next/head'
import { Poppins } from '@next/font/google'
import Todo from './component/Todo'
import { Provider } from 'react-redux'
import store from '../store'

const poppins = Poppins({
  weight: '400'
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={poppins.className}>
        <Provider store={store}>
          <Todo />
        </Provider>
      </main>
    </>
  )
}
