package com.hmtmcse.jira;

import com.atlassian.jira.rest.client.api.JiraRestClient;
import com.atlassian.jira.rest.client.api.domain.User;
import com.atlassian.jira.rest.client.internal.async.AsynchronousJiraRestClientFactory;
import com.hmtmcse.jira.data.JiraUserData;

import java.net.URI;


public class JIRARestHelper {

    public static String JIRA_URL = "";

    private URI getJiraUri() {
        return URI.create(JIRA_URL);
    }

    public JiraRestClient getJiraRestClient(String username, String password) {
        return new AsynchronousJiraRestClientFactory()
                .createWithBasicHttpAuthentication(getJiraUri(), username, password);
    }


    public JiraUserData login(String username, String password) {
        JiraUserData jiraUserData = new JiraUserData();
        jiraUserData.isLoginSuccess = false;
        JiraRestClient jiraRestClient = getJiraRestClient(username, password);
        try {
            User user = jiraRestClient.getUserClient().getUser(username).claim();
            jiraUserData.email = user.getEmailAddress();
            jiraUserData.name = user.getDisplayName();
            jiraUserData.isLoginSuccess = true;
        } catch (Exception e) {
            jiraUserData.isLoginSuccess = false;
        }
        return jiraUserData;
    }

}
