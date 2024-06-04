import { Module } from '@nestjs/common';
import { AssignmentService } from '../services/assignment.service';

@Module({
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}