CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkUserId" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar DEFAULT 'MEMBER' NOT NULL,
	"imageUrl" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_clerkUserId_unique" UNIQUE("clerkUserId"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "management_systems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "management_systems_id_unique" UNIQUE("id"),
	CONSTRAINT "management_systems_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "transaction_names" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"variant" varchar NOT NULL,
	"management_system_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "transaction_names_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "bank_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"management_system_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"balance" numeric(8, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bank_accounts_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "assign_receive_bank_to_transaction_names" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"receive_bank_account_id" uuid NOT NULL,
	"transaction_name_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assign_source_bank_to_transaction_names" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_bank_account_id" uuid NOT NULL,
	"transaction_name_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"management_system_id" uuid NOT NULL,
	"transaction_name_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"amount" numeric(8, 2) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "bank_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"management_system_id" uuid NOT NULL,
	"transaction_id" uuid NOT NULL,
	"source_bank_account_id" uuid,
	"receive_bank_account_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bank_transactions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_member" (
	"id" uuid PRIMARY KEY NOT NULL,
	"phone" varchar NOT NULL,
	"management_system_id" uuid NOT NULL,
	"family_expense_system_id" uuid NOT NULL,
	"family_member_role" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "family_member_id_unique" UNIQUE("id"),
	CONSTRAINT "family_member_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_expense_system" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"management_system_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "family_expense_system_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "management_systems" ADD CONSTRAINT "management_systems_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_names" ADD CONSTRAINT "transaction_names_management_system_id_management_systems_id_fk" FOREIGN KEY ("management_system_id") REFERENCES "public"."management_systems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_management_system_id_management_systems_id_fk" FOREIGN KEY ("management_system_id") REFERENCES "public"."management_systems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_receive_bank_to_transaction_names" ADD CONSTRAINT "assign_receive_bank_to_transaction_names_receive_bank_account_id_bank_accounts_id_fk" FOREIGN KEY ("receive_bank_account_id") REFERENCES "public"."bank_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_receive_bank_to_transaction_names" ADD CONSTRAINT "assign_receive_bank_to_transaction_names_transaction_name_id_transaction_names_id_fk" FOREIGN KEY ("transaction_name_id") REFERENCES "public"."transaction_names"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_source_bank_to_transaction_names" ADD CONSTRAINT "assign_source_bank_to_transaction_names_source_bank_account_id_bank_accounts_id_fk" FOREIGN KEY ("source_bank_account_id") REFERENCES "public"."bank_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_source_bank_to_transaction_names" ADD CONSTRAINT "assign_source_bank_to_transaction_names_transaction_name_id_transaction_names_id_fk" FOREIGN KEY ("transaction_name_id") REFERENCES "public"."transaction_names"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_management_system_id_management_systems_id_fk" FOREIGN KEY ("management_system_id") REFERENCES "public"."management_systems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transaction_name_id_transaction_names_id_fk" FOREIGN KEY ("transaction_name_id") REFERENCES "public"."transaction_names"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_transactions" ADD CONSTRAINT "bank_transactions_management_system_id_management_systems_id_fk" FOREIGN KEY ("management_system_id") REFERENCES "public"."management_systems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_transactions" ADD CONSTRAINT "bank_transactions_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member" ADD CONSTRAINT "family_member_phone_users_phone_fk" FOREIGN KEY ("phone") REFERENCES "public"."users"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member" ADD CONSTRAINT "family_member_management_system_id_management_systems_id_fk" FOREIGN KEY ("management_system_id") REFERENCES "public"."management_systems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member" ADD CONSTRAINT "family_member_family_expense_system_id_family_expense_system_id_fk" FOREIGN KEY ("family_expense_system_id") REFERENCES "public"."family_expense_system"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_expense_system" ADD CONSTRAINT "family_expense_system_management_system_id_management_systems_id_fk" FOREIGN KEY ("management_system_id") REFERENCES "public"."management_systems"("id") ON DELETE no action ON UPDATE no action;