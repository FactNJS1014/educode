import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { checkNeonHealth, initializeNeonSchema, seedNeonData } from '@/lib/db/neon';

export async function GET() {
  try {
    const health = await checkNeonHealth();
    return NextResponse.json(health);
  } catch (error: any) {
    return NextResponse.json(
      { configured: false, connected: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const sessionUser = await getSession();
  if (!sessionUser || sessionUser.role !== 'ADMIN') {
    return NextResponse.json({ success: false, error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const action = body.action;

    if (action === 'init_schema') {
      const res = await initializeNeonSchema();
      return NextResponse.json(res);
    } else if (action === 'seed_data') {
      const res = await seedNeonData();
      return NextResponse.json(res);
    } else {
      return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
