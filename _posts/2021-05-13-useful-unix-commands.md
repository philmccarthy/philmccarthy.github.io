---
layout: post
title:  "Useful Unix commands"
date:   2021-05-13 11:00:00 -0700
category: turing
---

I recently began going through Michael Hartl's Learn Enough Command Line to Be Dangerous course, and I'm using this post to keep notes about useful Unix commands. I'm actively updating this post as I work through the course!

### Editing and Cleaning Up

| What | How |
| --- | --- |
| Display manual page for command | `man <command>` |
| Cursor to beginning of line | `^A` |
| Cursor to end of line | `^E` |
| Clear to beginning of line | `^U` |
| Cursor to mouse | `option + click` |
| Scroll output out of view | `^L` |
| Exit terminal | `^D` |
| Abort | `^C` |
| Sleep | `sleep (seconds)` |

### File Manipulation

| What | How |
| --- | --- |
| Redirect operator | `echo "String" > filename.txt` |
| Return (concatenate) contents of file | `cat filename.txt` |
| Append operator | `echo "String 2" >> filename.txt` |
| Compare differences of files | `diff file1.txt file2.txt` |

Example of combining file manipulation commands:

```console
➜ ~/_turing/5mod/unix echo "From fairest creatures we desire increase," > sonnet_1.txt
➜ ~/_turing/5mod/unix echo "That thereby beauty's Rose might never die," >> sonnet_1.txt
➜ ~/_turing/5mod/unix echo "From fairest creatures we desire increase," > line_1.txt
➜ ~/_turing/5mod/unix echo "That thereby beauty's Rose might never die," > line_2.txt
➜ ~/_turing/5mod/unix cat line_1.txt > sonnet_1_copy.txt
➜ ~/_turing/5mod/unix cat sonnet_1_copy.txt
From fairest creatures we desire increase,
➜ ~/_turing/5mod/unix cat line_2.txt >> sonnet_1_copy.txt
➜ ~/_turing/5mod/unix cat sonnet_1_copy.txt
From fairest creatures we desire increase,
That thereby beauty's Rose might never die,
➜ ~/_turing/5mod/unix diff sonnet_1.txt sonnet_1_copy.txt
➜ ~/_turing/5mod/unix
```

More to come!
