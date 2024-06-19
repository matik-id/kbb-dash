import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';

type IJwt = {
    iat: number;
    exp: number;
}

export function middleware(request: NextRequest) {

    const { cookies } = request;
    const response = NextResponse.next();
    const jwt = cookies.get('Authorization');
    
    if (request.nextUrl.pathname.startsWith('/auth')) {
        if (jwt) {
            return NextResponse.redirect(new URL('/dashboard/admin/dashboard', request.url));
        }
        return NextResponse.next();
    }
    
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!jwt) {
            return NextResponse.redirect(new URL('/dashboard/auth/sign-in', request.url));
        }
        const decode: IJwt = jwtDecode(jwt.value);
        const now = dayjs().unix()
        if (now > decode.exp) {
            // Deleting cookies
            response.cookies.delete('Authorization')
            return response;
        }
        return response;
    }
}