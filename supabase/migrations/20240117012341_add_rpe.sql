create type "public"."RPE" as enum ('noEffort', 'easy', 'ideal', 'hard', 'maxEffort');

alter table "public"."workout_logs" drop column "reps";

alter table "public"."workout_logs" drop column "tasks";

alter table "public"."workout_logs" add column "movements" text[] not null;

alter table "public"."workout_logs" add column "rep_scheme" smallint[] not null default '{}'::smallint[];

alter table "public"."workout_logs" add column "rpe" "RPE" default 'ideal'::"RPE";


