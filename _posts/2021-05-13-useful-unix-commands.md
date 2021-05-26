---
layout: post
title:  "Useful Unix commands"
date:   2021-05-19 11:00:00 -0700
category: devEnv
---

I recently began going through Michael Hartl's Learn Enough Command Line to Be Dangerous course, and I'm using this post to keep notes about useful Unix commands. I'm actively updating this post as I work through the course!

## Basics

### Using Z shell instead of Bourne-again shell

In 2019, Apple changes the default shell on MacOS to zsh from bash. zsh behaves much like Bash, but it's worth making a few minor configuration updates to make Zsh behave more like Bash. You can [read more](https://scriptingosx.com/2019/06/moving-to-zsh/) about the switch from Bash to Zsh. MacOS also ships with Bash installed! So switching your Mac's default shell to Bash is an option.

I've chosen to keep using zsh, and followed [Hartl's advice](https://news.learnenough.com/macos-bash-zshell) to add these aliases to my `.zshrc` configuration file:

```zsh
# Avoid accidental deletion.
alias rm='rm -i'
alias mv='mv -i'
alias cp='cp -i'
# Prevent rm -f from asking for confirmation on things like `rm -f *.bak`.
setopt rm_star_silent
```

Out of the box, zsh doesn't prompt the user when they attempt to remove, move, or copy a file. These behavioral changes make zsh prompt me when I try to remove, move, or copy a file (like bash!).

### Editing and entering commands

Editing the command line is a regular part of a developer's day. These keybindings and commands are helpful to making command line usage more efficient.

| What | How |
| --- | --- |
| Display manual page for command | `man <command>` |
| Cursor to beginning of line | `^A` |
| Cursor to end of line | `^E` |
| Clear to beginning of line | `^U` |
| Cursor to mouse | `option + click` |
| Clear (non-destructive) | `^L` |
| Exit terminal | `^D` |
| Abort | `^C` |
| Sleep | `sleep (seconds)` |

## File Manipulation

Some of the most important tasks at a command line: manipulating files.

### Redirecting and appending

| What | How |
| --- | --- |
| Redirect operator | `echo "String" > filename.txt` |
| Return (concatenate) contents of file | `cat filename.txt` |
| Append operator | `echo "String 2" >> filename.txt` |
| Compare differences of files | `diff file1.txt file2.txt` |
| Change modification time on file (create empty file) | `touch filename.md` |

Example of combining file manipulation commands:

```zsh
➜ echo "From fairest creatures we desire increase," > sonnet_1.txt
➜ echo "That thereby beauty's Rose might never die," >> sonnet_1.txt
➜ echo "From fairest creatures we desire increase," > line_1.txt
➜ echo "That thereby beauty's Rose might never die," > line_2.txt
➜ cat line_1.txt > sonnet_1_copy.txt
➜ cat sonnet_1_copy.txt
From fairest creatures we desire increase,
➜ cat line_2.txt >> sonnet_1_copy.txt
➜ cat sonnet_1_copy.txt
From fairest creatures we desire increase,
That thereby beauty's Rose might never die,
```

### Listing

| What | How |
| --- | --- |
| List all files and directories (except hiddens) | `ls` |
| List all files and directories (plus hiddens) | `ls -a` |
| List files ending in .txt | `ls *.txt` |
| List files in **l**ong format | `ls -l` |
| List files by **r**eversed **t**ime of modification (**l**ong format) | `ls -rtl` |

Options can be combined in any order, so `ls -rtl` is the same as `ls -trl` and `ls -r -t -l`

#### Sidebar: Oh My Zsh

I've been using [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) for a while, and a zsh alias I use all the time is `l=ls -lah`, which combines options for **l**ong format, **a**ll files and directories, and **h**uman readable filesize.

These listing aliases are made available by Oh My Zsh:

```zsh
alias lsa='ls -lah'
alias l='ls -lah'
alias ll='ls -lh'
alias la='ls -lAh'
```

### Renaming, copying, deleting

Beyond listing files, moving, copying and deleting them is the next most common computer-toucher activity!

| What | How |
| --- | --- |
Move (or simply rename) a file | `mv current_name new_name`
Copy a file | `cp to_be_copied.txt copy.txt`
Delete a file | `rm file.txt`
Delete files without confirmation | `rm -f *.txt`

More to come!
