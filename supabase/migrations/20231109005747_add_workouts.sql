create table "public"."workouts" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null
);


alter table "public"."workouts" enable row level security;

CREATE UNIQUE INDEX workouts_pkey ON public.workouts USING btree (id);

alter table "public"."workouts" add constraint "workouts_pkey" PRIMARY KEY using index "workouts_pkey";


