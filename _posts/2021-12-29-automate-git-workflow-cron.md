---
layout: post
title:  "Automate a Git Workflow with cron"
date:   2021-12-28 17:30:00 -0700
---

The other day, I stumbled into a repo on GitHub that a developer uses to keep various dotfiles files backed up. It appeared like their process was automated: most weekdays for the entire year, there was a `Backup` commit made to the repo that kept track of this developer's local config files.

## Defining the Problem

It seemed relatively simple, and also super useful. I even had another use case in mind. Over the last few months, I started keeping my notes in markdown using the [Notable](https://notable.app/) app on my work and personal computers. There is cloud sync feature that relies on Dropbox, but I'd prefer to use Git.

Notable is pretty simple—notes are stored as `.md` files with some extra metadata. So on my two machines, I have a `notes` directory with all of these files stored. I initialized Git and began tracking these files, manually pushing and pulling changes to keep them in sync.

## Considering Solutions

This problem got me thinking about a few related concepts I've heard thrown around at work. One in particular was cron. The DevOps and Data engineers at VIZIO reference cronjobs often when talking about scheduled tasks in our AWS environment. This seemed like a good place to start digging.

First off, I skimmed the cron man page:

```
NAME
    cron -- daemon to execute scheduled commands (Vixie Cron)

DESCRIPTION
    The cron utility is launched by launchd(8) when it sees the existence of /etc/crontab or files in
    /usr/lib/cron/tabs.  There should be no need to start it manually.  See
    /System/Library/LaunchDaemons/com.vix.cron.plist for details.

    The cron utility searches /usr/lib/cron/tabs for crontab files which are named after accounts in
    /etc/passwd; crontabs found are loaded into memory.  The cron utility also searches for /etc/crontab
    which is in a different format (see crontab(5)).

    The cron utility then wakes up every minute, examining all stored crontabs, checking each command to
    see if it should be run in the current minute.  When executing commands, any output is mailed to the
    owner of the crontab (or to the user named in the MAILTO environment variable in the crontab, if such
    exists).
```

Manual pages can be super technical reading. But I've learned to start here before digging into search results, because it helps me identify more technically sound sources.

The cron man page references `crontab` files, so I read through some of the crontab man page as well:

```
NAME
    crontab -- maintain crontab files for individual users (V3)

DESCRIPTION
    The crontab utility is the program used to install, deinstall or list the tables used to drive the
    cron(8) daemon in Vixie Cron.  Each user can have their own crontab, and they are not intended to be
    edited directly.
```

This seemed promising. I read the rest of the man page, and this info on the `-e` option proved useful later on:

```
-e      Edit the current crontab using the editor specified by the VISUAL or EDITOR environment vari-
        ables.  The specified editor must edit the file in place; any editor that unlinks the file
        and recreates it cannot be used.  After you exit from the editor, the modified crontab will
        be installed automatically.
```

## Writing a crontab

I started by writing a basic shell script (`backup_notes.sh`) to automate the manual Git workflow:

```sh
!#/bin/bash

cd /Users/pmac/notes
# Pull changes from GitHub
git pull origin main

# If there have been local changes, commit and push
if [[ `git status --porcelain` ]]; then
  git add .
  git commit -m "Sync notes"
  git push origin main
fi
```

After creating this script, I ran `chmod 755 backup_notes.sh` to make it executable.

Next, I set up a scheduled job using `crontab -e`. I was initially seeing an error when running this command:

```
crontab: code -w: No such file or directory
crontab: "code -w" exited with status 1
```

This problem related to what the man page explained about the `-e` option. Because my default editor is set to VS Code (with `export EDITOR="code -w"` in my .zshrc), I needed to edit the file in place by setting my editor to `vim` temporarily:

```
env EDITOR=vim crontab -e
```

This opened the file in Terminal, where I was able to add my desired crontab:

```
MAILTO=""
45 10,14,18 * * 1-5 /Users/pmac/bin/backup_notes.sh
```

`MAILTO=""` means crontab will succeed or fail silently. You can also pass your local username in to receive `mail` from cron in the Terminal, which could be helpful for debugging a crontab that's not working as intended.

And the format for crontabs looked daunting at first, but it's pretty intuitive:

```
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12)
# |  |  |  |  .---- day of week (0 - 6)  (sun == 0 || sun == 7)
# |  |  |  |  |
# *  *  *  *  *  command to be executed
```

Plus, there are several [crontab generators](https://crontab.guru/#45_10,14,18_*_*_1-5) out there to easily compose these expressions.

My crontab translates like this:

```
45 10,14,18 * * 1-5 /Users/pmac/bin/backup_notes.sh

# At minute 45 past hour 10, 14, and 18 on every day-of-week
# from Monday through Friday, execute ./backup_notes.sh
```

Once I saved the crontab and closed vim, I got confirmation:

```
crontab: installing new crontab
```

To double check, scheduled jobs can be listed with `crontab -l`:

```
$ crontab -l
  MAILTO=""
  45 10,14,18 * * 1-5 /Users/pmac/bin/backup_notes.sh
```

With that, I just had to add a similar crontab to my work computer. Once my background work was scheduled, I just had to wait for some jobs to run! Over the next few days, I saw my syncing jobs start to execute from both machines. No more thought or effort required.

![crontab-commits](/assets/images/crontab-commits.jpg)

I admit that syncing notes is a pretty simple use case and that many apps have this feature baked in. But I was excited to learn about cron and crontabs, identify a potential use case, and quickly put an automation in place.
