import { SidebarNavLinkType } from '@/utils/types'
import { FaMicroblog } from 'react-icons/fa'
import { BiSolidOffer, BiSolidReport } from 'react-icons/bi'
import { SiGoogleadsense, SiGoogleads } from 'react-icons/si'
import { MdDashboard } from 'react-icons/md'
import ProfileIcon from '@/assets/Images/image.png'

// 1 -  For Sidebar
export const navLinks: SidebarNavLinkType[] = [
  {
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <MdDashboard size={20} />,
  },
  {
    name: 'Blogs',
    to: '/admin/blogs',
    icon: <FaMicroblog size={20} />,
  },
  {
    name: 'Lender Offers',
    to: '/',
    icon: <BiSolidOffer size={20} />,
  },
  {
    name: 'Leads Management',
    to: '/',
    icon: <SiGoogleadsense size={20} />,
  },
  {
    name: 'Leads Reporting ',
    to: '/ai-plagiarism',
    icon: <BiSolidReport size={20} />,
  },
  {
    name: 'HELOC Leads',
    to: '/publication',
    icon: <SiGoogleads size={20} />,
  },
]

// 2 -  data for blog page
export const blogsData = [
  {
    title: 'John Doe',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-01-15',
  },
  {
    title: 'Jane Smith',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-02-21',
  },
  {
    title: 'Mike Johnson',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-03-10',
  },
  {
    title: 'Sarah Williams',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-04-05',
  },
  {
    title: 'David Brown',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-05-18',
  },
  {
    title: 'Emily Davis',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-06-22',
  },
  {
    title: 'Robert Wilson',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-07-14',
  },
  {
    title: 'Lisa Moore',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-08-30',
  },
  {
    title: 'Thomas Taylor',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-09-11',
  },
  {
    title: 'Jennifer Anderson',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-10-25',
  },
  {
    title: 'Alex Martinez',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-11-19',
  },
  {
    title: 'Patricia Clark',
    content:
      'Mostly they seek to define what blogging is, what makes it so important.',
    image: ProfileIcon,
    publishDate: '2023-12-08',
  },
]
