export class CreatePostDto {
   photo: string;
  readonly description: string;
  readonly experienceRange: string;
  readonly wantedSalary: number;
  readonly cv: string;
   gender: 'Male' | 'Female' ;

}