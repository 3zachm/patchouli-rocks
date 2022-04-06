import { ReactElement } from 'react'
import HomeLayout from '../layouts/HomeLayout'

function Home() {
    return (
        <></>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Home
