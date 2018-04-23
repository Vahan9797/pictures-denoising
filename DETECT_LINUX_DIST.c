#define _GNU_SOURCE
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *replace_str(char *, char *, char *, int start);
void configureBindingGyp(const char *);

int main(void) {
    FILE *release_files_content;
    char *rel_line = NULL;
    size_t rel_len = 0;

    release_files_content = popen("cat /etc/*-release", "r");

    if(release_files_content == NULL) {
        printf("No such file detected\n");
        exit(EXIT_FAILURE);
    }

    while(getline(&rel_line, &rel_len, release_files_content) != -1) {
        if(strstr(rel_line, "DISTRIB_ID=Arch") || strstr(rel_line, "ID=arch") || strstr(rel_line, "ID_LIKE=archlinux")) {
            configureBindingGyp("Arch");
            break;
        }
        if(strstr(rel_line, "DISTRIB_ID=Ubuntu") || strstr(rel_line, "ID=ubuntu") || strstr(rel_line, "ID_LIKE=debian")) {
            configureBindingGyp("Ubuntu");
            break;
        }
    }
    fclose(release_files_content);

    if(rel_line) {
        free(rel_line);
    }
    exit(EXIT_SUCCESS);
}

void configureBindingGyp(const char *dist) {
    FILE *binding_gyp;
    char *line = NULL;
    size_t len = 0;

    if((binding_gyp = fopen("./binding.gyp", "r+")) == NULL) {
        return;
    }

    while(getline(&line, &len, binding_gyp) != -1) {
        if((strstr(line, "/usr/local/include") || strstr(line, "/usr/local/lib")) && dist == "Arch") {
            line = replace_str(line, "/usr/local", "/usr", 0);
            printf("Line: %s", line);
        }
        if((strstr(line, "/usr/include") || strstr(line, "/usr/lib")) && dist == "Ubuntu") {
            line = replace_str(line, "/usr", "/usr/local", 0);
            printf("Line: %s", line);
        }
    }
    fclose(binding_gyp);

    if(line) {
        free(line);
    }
}

char *replace_str(char *str, char *orig, char *rep, int start) {
    static char temp[4096];
    static char buffer[4096];
    char *p;

    strcpy(temp, str + start);

    if(!(p = strstr(temp, orig))) {   // Is 'orig' even in 'temp'?
        return str;
    }

    strncpy(buffer, temp, p - temp); // Copy characters from 'temp' start to 'orig' str
    buffer[p - temp] = '\0';

    sprintf(buffer + (p - temp), "%s%s", rep, p + strlen(orig));
    sprintf(str + start, "%s", buffer);

    return replace_str(str, orig, rep, start + (p - temp) + 1);
}