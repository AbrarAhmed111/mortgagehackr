// app/api/test/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { addBlog } from '@/lib/actions/addBlog'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const action = searchParams.get('action')

  try {
    if (!action) {
      return NextResponse.json({ error: 'Missing action parameter' }, { status: 400 })
    }

    switch (action) {
      case 'addBlog': {
        const result = await addBlog({
          title: 'Test Blog',
          slug: 'test-blog-' + Date.now(),
          profileImage: 'https://example.com/profile.jpg',
          content: [
            {
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA' +
                'AAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
                '//8/w38GIAXDIBKE0DHxgljNBAAO' +
                '9TXL0Y4OHwAAAABJRU5ErkJggg==',
              description: 'This is a test content block with base64 image',
            },
            {
              description: 'This is a text-only block',
            },
          ],
        })

        return NextResponse.json({ success: true, result })
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unexpected error', details: String(err) }, { status: 500 })
  }
}
