import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'
import { MongoClient } from 'mongodb'
import { Fragment } from 'react'
// const dummy_meetups = [
//     {
//         id: 'm1',
//         title: 'A dummy image',
//         image: 'https://th.bing.com/th/id/OIP.HJF_pvz5FgtGahf9GDJsCwHaFn?w=222&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
//         address: 'some address random one',
//         description: 'this is first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A dummy image',
//         image: 'https://th.bing.com/th/id/OIP.HJF_pvz5FgtGahf9GDJsCwHaFn?w=222&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
//         address: 'some address random one',
//         description: 'this is second meetup'
//     },
//     {
//         id: 'm3',
//         title: 'A dummy image',
//         image: 'https://cdn.britannica.com/46/93846-050-EDA09DD6.jpg',
//         address: 'some address random one',
//         description: 'this is third meetup'
//     },
//     {
//         id: 'm4',
//         title: 'A dummy image',
//         image: 'https://cdn.britannica.com/46/93846-050-EDA09DD6.jpg',
//         address: 'some address random one',
//         description: 'this is forth meetup'
//     }
// ]


const homePage = (props) => {
    // const [loadedMeetups, setLoadedMeetups] = useState([])
    // useEffect(() => {
    //     setLoadedMeetups(dummy_meetups);
    // }, [])

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='list of meetups' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     return {
//         props: {
//             meetups: dummy_meetups
//         }
//     }
// }

//data does not change 
export async function getStaticProps() {
    //fetch data from an api 
    const client = new MongoClient('mongodb+srv://shiva:X6J28Fy6v0aNYCmn@cluster0.3vd7ixu.mongodb.net/meetups?retryWrites=true&w=majority')
    //X6J28Fy6v0aNYCmn
    await client.connect()
    const db = client.db('meetups')

    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()

            }))
        },
        revalidate: 10
    };
}

export default homePage