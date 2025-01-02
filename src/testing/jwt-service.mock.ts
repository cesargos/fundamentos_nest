import { JwtService } from '@nestjs/jwt';
import { accessToken } from '@testing/access-token.mock';
import { jwtPayload } from '@testing/jwt-payload.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(accessToken),
    verify: jest.fn().mockReturnValue(jwtPayload),
  },
};
