import { Resend } from 'resend';

export async function POST() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    
    const result = await resend.emails.send({
      from: 'momentum@resend.dev',
      to: ['aleroboyo0@gmail.com'],
      subject: 'Vercel test',
      html: '<h1>Works!</h1>'
    });
    
    return Response.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('Resend error:', error);
    
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      apiKey: !!process.env.RESEND_API_KEY ? 'exists' : 'MISSING' 
    }, { status: 500 });
  }
}

