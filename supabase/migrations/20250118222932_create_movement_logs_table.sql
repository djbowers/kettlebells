create type "public"."weight_unit" as enum ('kilograms', 'pounds');

create table "public"."movement_logs" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "workout_log_id" bigint not null,
    "movement_name" text not null,
    "rep_scheme" smallint[] not null default '{}'::smallint[],
    "user_id" uuid not null,
    "weight_one_value" smallint,
    "weight_two_value" smallint,
    "weight_one_unit" weight_unit,
    "weight_two_unit" weight_unit
);


alter table "public"."movement_logs" enable row level security;

alter table "public"."workout_logs" alter column "workout_details" drop default;

alter table "public"."workout_logs" add column "completed_volume" smallint;

CREATE UNIQUE INDEX movement_logs_pkey ON public.movement_logs USING btree (id);

alter table "public"."movement_logs" add constraint "movement_logs_pkey" PRIMARY KEY using index "movement_logs_pkey";

alter table "public"."movement_logs" add constraint "movement_logs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."movement_logs" validate constraint "movement_logs_user_id_fkey";

alter table "public"."movement_logs" add constraint "movement_logs_workout_log_id_fkey" FOREIGN KEY (workout_log_id) REFERENCES workout_logs(id) ON DELETE CASCADE not valid;

alter table "public"."movement_logs" validate constraint "movement_logs_workout_log_id_fkey";

create policy "Enable delete for users based on user_id"
on "public"."movement_logs"
as permissive
for delete
to authenticated
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."movement_logs"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users"
on "public"."movement_logs"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for authenticated users"
on "public"."movement_logs"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));



